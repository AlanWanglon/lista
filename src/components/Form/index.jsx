import { FaPlus } from 'react-icons/fa';
import './Form.css';
import PropTypes from 'prop-types'

export default function Form({handleChange, handleSubmit, inputRef, novaTarefa}) {
    return (
        <>
            <form onSubmit={handleSubmit} className="form">
                <input
                    ref={inputRef}
                    type="text"
                    onChange={handleChange}
                    value={novaTarefa}
                />
                <button type="submit"><FaPlus /></button>
            </form>
        </>
    )
}

Form.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    inputRef: PropTypes.object,
    novaTarefa: PropTypes.string.isRequired
}