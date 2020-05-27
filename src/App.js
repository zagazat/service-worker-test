import React from 'react';

class App extends React.Component {
    async onSubmitHandler(elem) {
        elem.preventDefault();
        const input = document.getElementById('message');
        const userData = {
            message: input.value,
        };
        const response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(userData),
        });
        response
            .json()
            .then((res) => {
                if (!response.ok) {
                    throw res;
                }
                return alert(`ID: ${res.id}\nMessage: ${res.text}`);
            })
            .catch((error) => console.log(error));
    }
    render() {
        return (
            <form action='' id='form' onSubmit={this.onSubmitHandler}>
                <input type='text' id='message' />
                <button type='submit'>Send Message</button>
            </form>
        );
    }
}

export { App };
