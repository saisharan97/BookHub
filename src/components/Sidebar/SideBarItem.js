const SideBarItem = props => {
  const {eachItem} = props
  const {
    changeActiveBookshelfValue,
    changeActiveBookshelfLabel,
    activeBookshelfLabel,
  } = props

  const onclickBookShelf = () => {
    changeActiveBookshelfValue(eachItem.value)
    changeActiveBookshelfLabel(eachItem.label)
  }
  let customColor = ''
  let customFontWt = ''

  if (activeBookshelfLabel === eachItem.label) {
    customColor = 'blue'
    customFontWt = 'bold'
  }

  return (
    <li
      style={{
        cursor: 'pointer',
        marginTop: '15px',
        color: `${customColor}`,
        fontWeight: `${customFontWt}`,
      }}
    >
      <button
        type="button"
        onClick={onclickBookShelf}
        style={{
          backgroundColor: 'transparent',
          borderStyle: 'none',
          cursor: 'pointer',
        }}
      >
        {eachItem.label}
      </button>
    </li>
  )
}

export default SideBarItem
