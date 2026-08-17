interface GeoLocation {
  city: string;
  country: string;
}

const geoCache = new Map<string, GeoLocation>();

/**
 * IP adresinden Şehir ve Ülke bilgisini tespit eder.
 * Vercel / Cloudflare HTTP header'ları veya ip-api.com servisi kullanılır.
 */
export async function getLocationFromIp(ipAddress: string, reqHeaders?: Headers): Promise<GeoLocation> {
  // 1. HTTP Header kontrolü (Vercel, Cloudflare, vb.)
  if (reqHeaders) {
    const headerCity = reqHeaders.get('x-vercel-ip-city') || reqHeaders.get('cf-ipcity') || reqHeaders.get('x-client-city');
    const headerCountry = reqHeaders.get('x-vercel-ip-country') || reqHeaders.get('cf-ipcountry') || reqHeaders.get('x-client-country');

    if (headerCity || headerCountry) {
      let city = headerCity ? decodeURIComponent(headerCity) : 'Bilinmiyor';
      let country = headerCountry || 'Türkiye';
      if (country === 'TR') country = 'Türkiye';
      return { city, country };
    }
  }

  const cleanIp = ipAddress ? ipAddress.split(',')[0].trim() : '';

  // 2. Önbellek kontrolü
  if (cleanIp && geoCache.has(cleanIp)) {
    return geoCache.get(cleanIp)!;
  }

  const isLocalOrPrivate = !cleanIp || 
    cleanIp === '127.0.0.1' || 
    cleanIp === '::1' || 
    cleanIp.startsWith('::ffff:127.') || 
    cleanIp.startsWith('10.') || 
    cleanIp.startsWith('192.168.') || 
    cleanIp.startsWith('172.16.');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const apiUrl = isLocalOrPrivate
      ? 'http://ip-api.com/json/?lang=tr'
      : `http://ip-api.com/json/${cleanIp}?lang=tr`;

    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === 'success') {
        const result: GeoLocation = {
          city: data.city || data.regionName || (isLocalOrPrivate ? 'İstanbul' : 'Bilinmiyor'),
          country: data.country || 'Türkiye'
        };
        if (cleanIp && !isLocalOrPrivate) {
          geoCache.set(cleanIp, result);
        }
        return result;
      }
    }
  } catch (err) {
    // Zaman aşımı veya ağ hatası durumunda sessizce varsayılana geç
  }

  return {
    city: isLocalOrPrivate ? 'İstanbul' : 'Bilinmiyor',
    country: 'Türkiye'
  };
}
