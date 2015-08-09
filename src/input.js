/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

var Input = React.createClass({

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf([
            'color',
            'date',
            'datetime',
            'datetime-local',
            'email',
            'hidden',
            'month',
            'number',
            'password',
            'range',
            'search',
            'tel',
            'text',
            'time',
            'url',
            'week'
        ])
    },

    getDefaultProps: function() {
        return {
            type: 'text',
            hasBeenFocused: false
        };
    },

    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    recordFocus: function() {
        if (!this.state.hasBeenFocused) {
            this.setState({hasBeenFocused: true});
        }
    },

    showErrorsAfterFocus: function() {
        return this.showErrors() && this.state.hasBeenFocused;
    },

    render: function() {
        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
            return element;
        }

        var warningIcon = '';
        if (this.showErrorsAfterFocus()) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrorsAfterFocus()}
                layout={this.getLayout()}
                htmlFor={this.getId()}
            >
                {element}
                {warningIcon}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    },

    renderElement: function() {
        var classNames = ['form-control'];
        if (['range'].indexOf(this.props.type) !== -1) {
            classNames = [];
        }
        if (this.showErrorsAfterFocus()) {
            classNames.push('has-error');
        }
        if (this.props.className) {
            classNames.push(this.props.className);
        }
        return (
            <input
                {...this.props}
                className={classNames.join(' ')}
                id={this.getId()}
                label={null}
                value={this.getValue()}
                onChange={this.changeValue}
                disabled={this.isFormDisabled() || this.props.disabled}
                onFocus={this.state.hasBeenFocused ? null : this.recordFocus}
            />
        );
    }

});

module.exports = Input;
