importScripts('https://unpkg.com/dexie@3.0.1/dist/dexie.js');
importScripts('https://cdn.jsdelivr.net/npm/uuid@8.1.0/dist/umd/uuidv4.min.js');

const baseUrl = self.location.origin;

const database = new Dexie('testBase');
database.version(1).stores({
    messages: 'id, text',
});

/**
 * Эмулируем долгий ответ
 * @param ms
 * @returns {Promise<unknown>}
 */
function mockDelay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

async function addResponse(responseData, status = 200) {
    await mockDelay(2000);
    return new Response(JSON.stringify(responseData), {
        headers: {
            'Content-Type': 'application/json',
        },
        status,
    });
}

self.addEventListener('fetch', (evt) => {
    if (evt.request.url === `${baseUrl}/post`) {
        const uuid = uuidv4();

        evt.respondWith(
            evt.request
                .json()
                .then(({ message }) => {
                    if (message) {
                        return database.messages.put({
                            id: uuid,
                            text: message,
                        });
                    }
                    throw Error('oh no!');
                })
                .then(() => database.messages.get(uuid))
                .then(addResponse)
                .catch((error) => {
                    const errorObject = {
                        message: error.message,
                    };
                    return addResponse(errorObject, 400);
                })
        );
    }
});
