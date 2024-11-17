interface PageTitleProps {
  title: string
  subtitle: string
  heroText: string
  heroTextPosition?: 'left' | 'right' | 'middle'
}

export const PageTitle = (props: PageTitleProps) => {
  const renderTitle = () => {
    const titleParts = props.title.split(props.heroText)

    if (props.heroTextPosition === 'middle' && titleParts.length > 1) {
      return (
        <>
          <span className="text-black">{titleParts[0]}</span>
          <span className="inline-block bg-custom-gradient bg-clip-text text-2xl font-bold text-transparent">
            {props.heroText}
          </span>
          <span className="text-black">{titleParts[1]}</span>
        </>
      )
    }

    switch (props.heroTextPosition) {
      case 'left':
        return (
          <p className="inline-block bg-custom-gradient bg-clip-text text-2xl font-bold text-transparent">
            {props.heroText}
            <span className="text-black">{props.title}</span>
          </p>
        )
      case 'right':
        return (
          <>
            <span className="text-black">{props.title}</span>
            <span className="inline-block bg-custom-gradient bg-clip-text text-2xl font-bold text-transparent">
              {props.heroText}
            </span>
          </>
        )
      default:
        return (
          <>
            <span className="text-black">{props.title}</span>
            <span className="inline-block bg-custom-gradient bg-clip-text text-2xl font-bold text-transparent">
              {props.heroText}
            </span>
          </>
        )
    }
  }

  return (
    <div className="mt-14 gap-6 space-y-4 text-center">
      <div className="text-center text-2xl font-bold">{renderTitle()}</div>
      <p
        className="max-w-screen-[770px] text-center text-custom-black"
        dangerouslySetInnerHTML={{ __html: props.subtitle }}
      />
    </div>
  )
}
