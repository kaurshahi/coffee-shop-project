import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="w-full flex-grow px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
