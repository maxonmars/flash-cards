import React from 'react'
import {SuperInputText} from "./c1-SuperInputText/SuperInputText";
import {SuperButton} from "./c2-SuperButton/SuperButton";
import {SuperCheckbox} from "./c3-SuperCheckbox/SuperCheckbox";
import {SuperEditableSpan} from "./c4-SuperEditableSpan/SuperEditableSpan";
import {SuperSelect} from "./c5-SuperSelect/SuperSelect";
import {SuperRadio} from "./c6-SuperRadio/SuperRadio";

export const ComponentsTestRack = () => {

    return <div>
        <SuperInputText/>
        <SuperButton children={'test button'}/>
        <SuperCheckbox/>
        <SuperEditableSpan value={"editable span test"}/>
        <SuperSelect options={['1', '2', '3']}/>
        <SuperRadio options={['a', 'b', 'c']} value={'b'}/>
    </div>
}