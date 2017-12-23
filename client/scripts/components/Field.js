import React from 'react';

const Field = ({ name, placeholder, value, onChange, type }) => {
	return(
		<div className='form-group row justify-content-center'>
			<input className="form-control col-9" 
						 id={ `field-${name}` }
						 name={ name }
						 placeholder={ placeholder }
						 type={ type }
						 value={ value }
						 onChange={ onChange }
					/>
		</div>
	)
}

export default Field;