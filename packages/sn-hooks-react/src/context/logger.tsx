import { Logger, LoggerCollection } from '@sensenet/client-utils'
import React from 'react'
import { useInjector } from '../hooks'
/**
 * Context for a Logger instance
 */
export const LoggerContext = React.createContext<Logger>(new LoggerCollection())
LoggerContext.displayName = 'LoggerContext'

/**
 * Wrapper for the LoggerContext component.
 * Returns the current injector's default logger. Has to be wrapped with **InjectorContext**
 */
export const LoggerContextProvider: React.FunctionComponent = ({ children }) => {
  const injector = useInjector()
  return <LoggerContext.Provider value={injector.logger}>{children}</LoggerContext.Provider>
}
