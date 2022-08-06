import React, { FunctionComponent } from 'react';
import Switch from 'react-switch';
import Colors from 'assets/themes/Colors';

interface SurveyStatusToggleProps {
    checked: boolean;
    onChange: () => void;
}

const SurveyStatusToggle: FunctionComponent<SurveyStatusToggleProps> = (props: SurveyStatusToggleProps) => {
    const { checked, onChange } = props;

    return (
        <Switch
            onChange={onChange}
            checked={checked}
            width={50}
            height={20}
            onColor='#A5AAB5'
            offColor='#A5AAB5'
            onHandleColor={Colors.active}
            offHandleColor={Colors.inactive}
            activeBoxShadow=''
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
        />
    );
};

export default SurveyStatusToggle;
