import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss'


class HomePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div className="home-page">
                <p>home</p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
