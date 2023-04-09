import React from 'react';
import {PresetElementsList} from "../components/PresetElementsList/PresetElementsList";
import {Col, Row} from 'antd';
import {SidebarIntevals} from "../components/SidebarIntevals/SidebarIntevals";

function IntervalsSettingsPage() {
    return (
        <>
            <Row>
                <Col span={12}>
                    <SidebarIntevals/>
                </Col>
                <Col span={12}>
                    <PresetElementsList/>
                </Col>
            </Row>
        </>
    );
}

export default IntervalsSettingsPage;