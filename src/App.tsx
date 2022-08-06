import React, { FunctionComponent } from 'react';
import CustomToastContainer from 'components/CustomToastContainer';
import 'react-toastify/dist/ReactToastify.css';
import Full from 'containers/Full';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';

const App: FunctionComponent = () => {
    return (
        <div className='App'>
            <Full />
            <CustomToastContainer />
        </div>
    );
};

export default App;
