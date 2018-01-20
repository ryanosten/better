import React from 'react';
import Select from 'react-select';


class InviteGroupSelect extends React.Component {
	constructor(){
		super()
		this.state = {
			value: '',
		}
		this.handleChange = this.handleChange.bind(this);
	}
  
  handleChange (value) {
  	console.log({ value });
  }

  render() {

    return (
      <Select
        name="groups"
        value={this.state.value}
        onChange={this.handleChange}
        multi={true}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      />
    )
  }
}

export default InviteGroupSelect;