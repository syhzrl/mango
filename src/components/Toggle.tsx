import React, { FunctionComponent } from 'react';
import Switch from 'react-switch';
import SVG from 'react-inlinesvg';

import icons from 'assets/icons';
import Colors from 'assets/themes/Colors';

interface ToggleProps {
    checked: boolean;
    onChange: () => void;
}

const checkedHandleIcon = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <SVG
                src={icons.Check}
                style={{ color: 'white' }}
            />
        </div>
    );
};

const unCheckedHandleIcon = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <SVG
                src={icons.Uncheck}
                style={{ color: 'white' }}
            />
        </div>
    );
};

const Toggle: FunctionComponent<ToggleProps> = (props: ToggleProps) => {
    const { checked, onChange } = props;

    return (
        <Switch
            onChange={onChange}
            checked={checked}
            onColor='#006FBE'
            offColor='#F8B148'
            onHandleColor={Colors.active}
            offHandleColor={Colors.inactive}
            uncheckedIcon={unCheckedHandleIcon()}
            checkedIcon={checkedHandleIcon()}
            activeBoxShadow=''
            height={20}
            width={50}
            handleDiameter={30}
        />
    );
};

export default Toggle;
