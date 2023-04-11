import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <>
            <Result status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={getBackButton()}
            />
        </>
    );
}

function getBackButton() {
    return <Button type="primary">
        <Link to="/">
            Back Home
        </Link>
    </Button>
}

export default NotFoundPage;