/**
 * @desc 组件 - {{componentName}}
 * @author {{author}}
 * @date {{date}}
 */

{{#if hasStyle}}
import "./{{styleFileName}}";
{{/if}}
import React from "react";
{{#if isComponent}}
import PropTypes from "prop-types";
{{/if}}

export default class {{componentName}} extends React.Component {
  {{#if isComponent}}
  static propTypes = {
    
  }

  static defaultProps = {
    
  }
  {{/if}}

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={{{componentClassName}}}></div>
    )
  }
}
