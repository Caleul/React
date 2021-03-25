const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'black' : 'blue',
    padding: 20,
  }),
  control: base => ({
    ...base,
    // none of react-select's styles are passed to <Control />
    flex: 1,
    borderRadius: 20,
    paddingLeft: 10,
    minWidth: 240,
    background: 'rgba(196, 196, 196, 0.3)',
    border: 0,
    marginBottom: 15,
    marginTop: 15,
  }),
  placeholder: base => ({
    ...base,
    color: 'white',
  }),
  multiValue: base => ({
    ...base,
    color: 'white',
  }),
  singleValue: base => ({
    ...base,
    color: 'white',
  }),
  input: base => ({
    ...base,
    color: 'white',
  }),
};

export default customStyles;
