/**
 * Supabase Admin (service_role) helper.
 * Only use this module on server-side code.
 */

function getSupabaseConfig() {
    return {
        url: process.env.SUPABASE_URL,
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    };
}

function isSupabaseAdminConfigured() {
    const { url, serviceRoleKey } = getSupabaseConfig();
    return Boolean(url && serviceRoleKey);
}

function buildSupabaseUrl(pathname, query = {}) {
    const { url } = getSupabaseConfig();
    const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const target = new URL(normalized, url);

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            target.searchParams.set(key, String(value));
        }
    });

    return target.toString();
}

async function supabaseAdminRequest(pathname, options = {}) {
    const { serviceRoleKey } = getSupabaseConfig();
    if (!isSupabaseAdminConfigured()) {
        throw new Error('SUPABASE_URL veya SUPABASE_SERVICE_ROLE_KEY eksik.');
    }

    const {
        method = 'GET',
        query = {},
        body,
        headers = {}
    } = options;

    const requestHeaders = {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        ...headers
    };

    if (body !== undefined && !requestHeaders['Content-Type']) {
        requestHeaders['Content-Type'] = 'application/json';
    }

    const response = await fetch(buildSupabaseUrl(pathname, query), {
        method,
        headers: requestHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined
    });

    const contentType = response.headers.get('content-type') || '';
    let data = null;

    if (contentType.includes('application/json')) {
        data = await response.json().catch(() => null);
    } else {
        const text = await response.text().catch(() => '');
        data = text || null;
    }

    return {
        ok: response.ok,
        status: response.status,
        data
    };
}

async function checkSupabaseAdminAccess() {
    if (!isSupabaseAdminConfigured()) {
        return {
            configured: false,
            ok: false,
            status: 0,
            message: 'Supabase admin değişkenleri tanımlı değil.'
        };
    }

    try {
        // service_role access check using Auth Admin API
        const result = await supabaseAdminRequest('/auth/v1/admin/users', {
            method: 'GET',
            query: { page: 1, per_page: 1 }
        });

        return {
            configured: true,
            ok: result.ok,
            status: result.status,
            message: result.ok
                ? 'Supabase service_role erişimi aktif.'
                : 'Supabase service_role erişimi başarısız.'
        };
    } catch (error) {
        return {
            configured: true,
            ok: false,
            status: 0,
            message: error.message
        };
    }
}

module.exports = {
    getSupabaseConfig,
    isSupabaseAdminConfigured,
    supabaseAdminRequest,
    checkSupabaseAdminAccess
};
