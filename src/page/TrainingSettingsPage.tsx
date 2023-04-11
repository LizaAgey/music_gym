import React from 'react';
import {Sidebar} from "../components/Sidebar/Sidebar";
import {PresetElementsList} from "../components/PresetElementsList/PresetElementsList";
import {Col, Row} from 'antd';

function TrainingSettingsPage() {
    return (
        <>
            <Row>
                <Col span={12}>
                    <Sidebar/>
                </Col>
                <Col span={12}>
                    <PresetElementsList/>
                </Col>
            </Row>
        </>
    );
}

export default TrainingSettingsPage;