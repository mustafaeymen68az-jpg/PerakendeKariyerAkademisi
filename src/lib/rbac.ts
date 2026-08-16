import { prisma } from '@/lib/db';

export type SystemRoleType = 'STUDENT' | 'INSTRUCTOR' | 'ORGANIZATION_ADMIN' | 'PLATFORM_ADMIN';

export const SYSTEM_ROLE_MAP: Record<string, SystemRoleType> = {
  'ADMIN': 'PLATFORM_ADMIN',
  'PLATFORM_ADMIN': 'PLATFORM_ADMIN',
  'TRAINER': 'INSTRUCTOR',
  'INSTRUCTOR': 'INSTRUCTOR',
  'COMPANY_MANAGER': 'ORGANIZATION_ADMIN',
  'ORGANIZATION_ADMIN': 'ORGANIZATION_ADMIN',
  'PARTICIPANT': 'STUDENT',
  'STUDENT': 'STUDENT',
  'USER': 'STUDENT',
  'INDIVIDUAL': 'STUDENT',
  'EMPLOYEE': 'STUDENT',
};

export const ROLE_LABELS: Record<SystemRoleType, string> = {
  'STUDENT': 'Öğrenci Görünümü',
  'INSTRUCTOR': 'Eğitmen Görünümü',
  'ORGANIZATION_ADMIN': 'Kurum Yöneticisi Görünümü',
  'PLATFORM_ADMIN': 'Platform Yöneticisi Görünümü',
};

export const ROLE_REDIRECTS: Record<SystemRoleType, string> = {
  'STUDENT': '/panel',
  'INSTRUCTOR': '/egitmen',
  'ORGANIZATION_ADMIN': '/kurumsal',
  'PLATFORM_ADMIN': '/admin',
};

/**
 * Fetch all active system roles for a user from database and legacy field
 */
export async function getUserSystemRoles(userId: string): Promise<SystemRoleType[]> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) return ['STUDENT'];

    const rolesSet = new Set<SystemRoleType>();

    // Add roles from UserRole model
    if (user.userRoles && user.userRoles.length > 0) {
      for (const ur of user.userRoles) {
        const mapped = SYSTEM_ROLE_MAP[ur.role.name];
        if (mapped) rolesSet.add(mapped);
      }
    }

    // Add fallback role from User.role field
    if (user.role && SYSTEM_ROLE_MAP[user.role]) {
      rolesSet.add(SYSTEM_ROLE_MAP[user.role]);
    }

    if (rolesSet.size === 0) {
      rolesSet.add('STUDENT');
    }

    return Array.from(rolesSet);
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return ['STUDENT'];
  }
}

/**
 * Check if user has a specific role
 */
export function hasRole(roles: SystemRoleType[], requiredRole: SystemRoleType): boolean {
  if (roles.includes('PLATFORM_ADMIN')) return true; // Platform admin has access to everything
  return roles.includes(requiredRole);
}

/**
 * Enforce Organization Isolation: checks if user belongs to target organization
 */
export function verifyOrganizationAccess(userCompanyId: string | null | undefined, targetCompanyId: string): boolean {
  if (!userCompanyId) return false;
  return userCompanyId === targetCompanyId;
}

/**
 * Enforce Instructor Course Isolation: checks if trainer manages the course
 */
export function verifyTrainerAccess(userTrainerId: string | null | undefined, courseTrainerId: string | null | undefined): boolean {
  if (!userTrainerId || !courseTrainerId) return false;
  return userTrainerId === courseTrainerId;
}
