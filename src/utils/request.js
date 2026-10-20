
const restUrl = "https://wdbphrvyoroyjmpwkelo.supabase.co/rest/v1";
// const authUrl = "https://wdbphrvyoroyjmpwkelo.supabase.co/auth/v1";
const storageUrl = "https://wdbphrvyoroyjmpwkelo.supabase.co/storage/v1/object/images";

export async function uploadFile(fileName, file) {
    const options = {
        headers: {
            apiKey: import.meta.env.VITE_API_KEY,
            'Content-Type': file.type || 'application/octet-stream'
        }
    };
    const response = await fetch(`${storageUrl}/${fileName}`, {
        method: "POST",
        body: file,
        ...options,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return `https://wdbphrvyoroyjmpwkelo.supabase.co/storage/v1/object/images/${fileName}`;

}

async function baseRequest(url, path = "/", method = "GET", data = null, opts = {}) {
        const options = {
        headers: {
            apiKey: import.meta.env.VITE_API_KEY,
            Prefer: "return=representation"
        },
        ...opts
    };

    if (method !== "GET") {
        options.method = method;
    }

    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${url}${path}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export default async function request(path = "/", method = "GET", data = null, opts = {}) {
    return baseRequest(restUrl, path, method, data, opts);
}
//export default baseRequest.bind(null, restUrl);

// export const authRequest = async (path = "/", method = "GET", data = null, opts = {}) => {
//     return baseRequest(authUrl, path, method, data, opts);
// };
//export const authRequest = baseRequest.bind(null, authUrl);
