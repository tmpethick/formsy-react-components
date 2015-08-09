/*jshint node:true */

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

var Input = React.createClass({
    displayName: 'Input',

    mixins: [Formsy.Mixin, ComponentMixin],

    propTypes: {
        type: React.PropTypes.oneOf(['color', 'date', 'datetime', 'datetime-local', 'email', 'hidden', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text',
            hasBeenFocused: false
        };
    },

    changeValue: function changeValue(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },

    recordFocus: function recordFocus() {
        if (!this.state.hasBeenFocused) {
            this.setState({ hasBeenFocused: true });
        }
    },

    showErrorsAfterFocus: function showErrorsAfterFocus() {
        return this.showErrors() && this.state.hasBeenFocused;
    },

    render: function render() {
        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
            return element;
        }

        var warningIcon = '';
        if (this.showErrorsAfterFocus()) {
            warningIcon = React.createElement(Icon, { symbol: 'remove', className: 'form-control-feedback' });
        }

        return React.createElement(
            Row,
            {
                label: this.props.label,
                required: this.isRequired(),
                hasErrors: this.showErrorsAfterFocus(),
                layout: this.getLayout(),
                htmlFor: this.getId()
            },
            element,
            warningIcon,
            this.renderHelp(),
            this.renderErrorMessage()
        );
    },

    renderElement: function renderElement() {
        var classNames = ['form-control'];
        if (['range'].indexOf(this.props.type) !== -1) {
            classNames = [];
        }
        if (this.showErrorsAfterFocus()) {
            classNames.push('has-errors');
        }
        return React.createElement('input', _extends({
            className: classNames.join(' ')
        }, this.props, {
            id: this.getId(),
            label: null,
            value: this.getValue(),
            onChange: this.changeValue,
            disabled: this.isFormDisabled() || this.props.disabled,
            onFocus: this.state.hasBeenFocused ? null : this.recordFocus
        }));
    }

});

module.exports = Input;