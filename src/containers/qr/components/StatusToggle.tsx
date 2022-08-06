import React, { FunctionComponent } from 'react';
import SVG from 'react-inlinesvg';
import Switch from 'react-switch';

import icons from 'assets/icons';

import Text from 'components/Text';
import Colors from 'assets/themes/Colors';

interface StatusToggleProps {
    checked: boolean;
    onChange: () => void;
}

const StatusToggle: FunctionComponent<StatusToggleProps> = (props: StatusToggleProps) => {
    const { checked, onChange } = props;

    return (
        <Switch
            onChange={onChange}
            checked={checked}
            width={100}
            height={25}
            onColor='#006FBE'
            offColor='#F8B148'
            onHandleColor={Colors.active}
            offHandleColor={Colors.inactive}
            activeBoxShadow=''
            handleDiameter={40}
            checkedIcon={
                (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            marginLeft: '30px',
                            color: 'white',
                        }}
                    >
                        <Text style={{ fontSize: '14px' }}>Active</Text>
                    </div>
                )
            }
            uncheckedIcon={
                (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            marginRight: '40px',
                            color: 'white',
                        }}
                    >
                        <Text style={{ fontSize: '14px' }}>Inactive</Text>
                    </div>
                )
            }
            checkedHandleIcon={
                (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: 'white',
                        }}
                    >
                        <SVG src={icons.Check} style={{ height: '25px', width: '25px' }} />
                    </div>
                )
            }
            uncheckedHandleIcon={
                (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: 'white',
                        }}
                    >
                        <SVG src={icons.Uncheck} style={{ height: '20px', width: '20px' }} />
                    </div>
                )
            }
        />
    );
};

export default StatusToggle;
