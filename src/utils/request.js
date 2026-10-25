const baseUrl = "https://wdbphrvyoroyjmpwkelo.supabase.co";
const restUrl = `${baseUrl}/rest/v1`;
const authUrl = `${baseUrl}/auth/v1`;
const storageUrl = `${baseUrl}/storage/v1/object/images`;
const publicStorageUrl = `${baseUrl}/storage/v1/object/public/images`;

async function baseRequest(url, path = "/", method = "GET", data = null, opts = {}) {
    const options = {
        ...opts,
        headers: {
            ...opts.headers,
            apiKey: import.meta.env.VITE_API_KEY,
            Prefer: "return=representation",
            ...getAuthHeader()
        },
    };

    if (method !== "GET") {
        options.method = method;
    }

    if (data) {
        options.headers["Content-Type"] = options.headers["Content-Type"] || "application/json";
        options.body = data instanceof File ? data : JSON.stringify(data);
    }

    const response = await fetch(`${url}${path}`, options);

    if (!response.ok) {
        throw new Error(await getErrorMessage(response));
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export default async function request(path = "/", method = "GET", data = null, opts = {}) {
    return baseRequest(restUrl, path, method, data, opts);
}

export const authRequest = async (path = "/", method = "GET", data = null, opts = {}) => {
    return baseRequest(authUrl, path, method, data, opts);
};

// Returns the public URL of a file in the "images" bucket.
export const getImageUrl = (fileName) => `${publicStorageUrl}/${fileName}`;

// Uploads a file to the "images" bucket and returns its public URL.
export const storageRequest = async (fileName, file) => {
    await baseRequest(storageUrl, `/${fileName}`, "POST", file, {
        headers: {
            'Content-Type': file.type || "application/octet-stream",
        }
    });

    return getImageUrl(fileName);
};

// Supabase returns errors as JSON with different field names depending on the service.
async function getErrorMessage(response) {
    try {
        const body = await response.json();

        return body.msg || body.message || body.error_description || body.error || `HTTP error! status: ${response.status}`;
    } catch {
        return `HTTP error! status: ${response.status}`;
    }
}

function getAuthHeader() {
    const auth = localStorage.getItem("auth");
    const accessToken = auth ? JSON.parse(auth)?.access_token : null;

    return {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
}
