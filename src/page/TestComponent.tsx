import React from 'react';
import jwt_decode from 'jwt-decode';
import CredentialResponse = google.accounts.id.CredentialResponse;

const clientId = "665344838178-0p0t79qgdq6lubuv400nra06p8lae7m3.apps.googleusercontent.com"

interface CredentialPayload {
    name?: string;
    picture?: string;
}

const TestComponent: React.FC = () => {

    const [user, setUser] = React.useState<CredentialPayload | null>()

    function handleCallbackResponse(response: CredentialResponse) {
        console.log("Encoded JWT ID token: " + response.credential)
        const userObject: CredentialPayload = jwt_decode<CredentialPayload>(response.credential)
        setUser(userObject);
        console.log(userObject);
        // document.getElementById("signInDiv")!.hidden = true;

    }

    function handleSignOut(e: any) {
        setUser(null);
    }

    React.useEffect(() => {
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv")!,
            {
                type: "standard", // or "icon"
                theme: "outline",
                size: "large"
            }
        );
    }, []);


    return (
        <div>
            <div id="signInDiv">
                {user &&
                    <div>
                        <button onClick={(e) => handleSignOut(e)}>SIGN OUT</button>
                        <div>
                            <img src={user?.picture}></img>
                            <h3>{user?.name} </h3>
                        </div>
                    </div>
                }
            </div>

        </div>
    );
};

export default TestComponent;