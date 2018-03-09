import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth'
import ReactCountdownClock from 'react-countdown-clock';

export class Inactive extends React.Component {
    state = {
        inactive: false,
        _ismounted: true,
    };

    componentDidMount() {
        // this.setState({_ismounted: true});
        this.startLogout();
        this.startInactivityReminder();
    }

    startInactivityReminder() {
            window.addEventListener('click', () => this.resetLogout());
    this.reminder = setTimeout(
        () => this.setState({inactive: true}),
        2000 // 15 minutes
    )
    }

    startLogout() {
        console.log('starting boot timer');
        this.logoutInterval = setTimeout(
            () => this.logout(),
            15000 // 15 seconds
        )
    }

    resetLogout() {
        console.log('reset boot timer')
        clearInterval(this.logoutInterval)
        this.startLogout();
        this.resetAlert();
    }

    resetAlert() {
        this.setState({inactive: false})
        console.log('reset alert timer')
        clearInterval(this.reminder)
        this.startInactivityReminder();
    }

    logout() {
        console.log('booting you');
        this.props.dispatch(clearAuth());
    }

    componentWillUnmount() {
        window.removeEventListener('click', () => this.resetLogout());
        clearInterval(this.logoutInterval)
        console.log('boot timer stopped');
        clearInterval(this.reminder)
        console.log('timer stopped');
    }

    

    render() {
        let inactivityAlert;
        if (this.state.inactive) {
            inactivityAlert = (<div>
            <h3>Click your mouse to stay logged in</h3>
            <ReactCountdownClock 
                seconds={13}
                color="#000"
                alpha={0.9}
                size={50}
                onComplete={console.log('done')} />
            </div>)
        }
        return (
            
            <div className="inactive-button">
                {inactivityAlert}
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     console.log('change state ' + state.auth.currentUser);
//     return {
//         loggedIn: state.auth.currentUser,
//     };
// };

export default (connect()(Inactive));
