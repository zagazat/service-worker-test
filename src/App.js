import React from 'react';

class App extends React.Component {
    async onClickHandler(event) {
        event.persist();
        const button = event.nativeEvent.target;

        const userData = {
            message: button.innerText,
        };

        const response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(userData),
        });

        button.setAttribute('Disabled', true); // loading = true;
        response
            .json()
            .then((res) => {
                if (!response.ok) {
                    throw res;
                }
                return alert(`ID: ${res.id}\nMessage: ${res.text}`);
            })
            .catch((error) => console.error(error))
            .finally(() => button.removeAttribute('Disabled')); // loading = false;
    }

    render() {
        return (
            <>
                <div className='submitAndLog'>
                    <button type='button' onClick={this.onClickHandler}>
                        Ready!
                    </button>
                </div>
                <div className='submitAndLog'>
                    <button type='button' onClick={this.onClickHandler}>
                        Steady!
                    </button>
                </div>
                <div className='submitAndLog'>
                    <button type='button' onClick={this.onClickHandler}>
                        Go!
                    </button>
                </div>
            </>
        );
    }
}

export { App };
