import Secondary from './variants/Secondary'
import Primary from './variants/Primary'
interface INoResultsScreen {
  variant: 'Primary' | 'Secondary',
  text?: string,
  actionButton?: React.ReactElement
}

const variants = {
  Primary,
  Secondary
}

const NoResultsScreen = ({ variant = 'Primary', ...props }: INoResultsScreen) => {
  const Component = variants[variant]
  return <Component {...props} />
}

export default NoResultsScreen