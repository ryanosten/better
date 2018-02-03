import React from 'react';
import Select from 'react-select';
 
class MultiSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedOption: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption){
    console.log(selectedOption);
    this.setState({ selectedOption });
    // console.log(`Selected: ${selectedOption}`);
  }

  render() {
  	const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
 
    return (
      <Select
        name="form-field-name"
        value={value}
        multi
        onChange={this.handleChange}
        options={[
          { value: 'admin', label: 'Admin' },
          { value: 'manager', label: 'Manager' },
          { value: 'feedbacker', label: 'Feedbacker' }
        ]}
      />
    );
  }
}

export default MultiSelect;