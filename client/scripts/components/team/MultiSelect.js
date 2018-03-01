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
    
    const selectGroups = this.props.groups.reduce((groups, item) => {
      let groupItem = {
        label: item.name,
        value: item._id,
      }

      groups.push(groupItem)

      return groups
    
    }, []);

    return (
      <Select
        name="form-field-name"
        value={this.state.selectedOption}
        multi={true}
        onChange={this.handleChange}
        options={selectGroups}
      />
    );
  }
}

export default MultiSelect;