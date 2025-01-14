import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  createStyles,
  Grid,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import snLogo from '../../assets/sensenet-icon-32.png'
import { globals, useGlobalStyles } from '../../globalStyles'
import { useLocalization } from '../../hooks'
import { ShortTextInput } from '../field-controls/ShortText'

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      position: 'relative',
      height: globals.common.headerHeight,
      backgroundColor: globals.common.headerBackground,
      boxShadow: 'none',
    },
    loginSubtitle: {
      marginBottom: '1em',
    },
  }),
)

const DEVDEMO_URL = `https://dev.demo.sensenet.com`

type LoginPageProps = {
  handleSubmit: (url: string) => void
  isLoginInProgress: boolean
}

export default function LoginPage({ handleSubmit, isLoginInProgress }: LoginPageProps) {
  const classes = useStyles()
  const globalClasses = useGlobalStyles()
  const [url, setUrl] = useState('')
  const localization = useLocalization().login

  const handleOnSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    handleSubmit(url)
  }

  const handleDemoSubmit = () => {
    handleSubmit(DEVDEMO_URL)
  }

  return (
    <>
      <AppBar position="sticky" className={clsx(globalClasses.centeredHorizontal, classes.appBar)}>
        <Grid container direction="row">
          <Grid item xs={1}>
            <Grid container justify="flex-end">
              <Link to="/">
                <img src={snLogo} alt="sensenet logo" />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container direction="column">
          <Grid container direction="column" justify="center" style={{ flexBasis: 150 }}>
            <Typography align="center" variant="h4" component="p">
              {localization.welcome}
            </Typography>
          </Grid>
          <Grid container direction="column" justify="center" alignItems="center" style={{ flexBasis: 150 }}>
            <Grid item alignContent="center" alignItems="center">
              <Typography align="center" variant="subtitle1" component="p">
                {localization.demoTitle}
              </Typography>
            </Grid>
            <Grid item alignContent="center" alignItems="center">
              <Button
                onClick={handleDemoSubmit}
                size="medium"
                aria-label={localization.loginToDemoButtonTitle}
                disabled={isLoginInProgress}
                variant="contained"
                color="secondary">
                {localization.loginToDemoButtonTitle}
                {isLoginInProgress && <CircularProgress size={14} />}
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <form onSubmit={handleOnSubmit}>
              <Typography align="center" variant="subtitle1" component="p" className={classes.loginSubtitle}>
                {localization.repositoryUrl}
              </Typography>
              <InputLabel shrink htmlFor="repository" required={true}>
                {localization.repositoryLabel}
              </InputLabel>
              <ShortTextInput
                required={true}
                name="repository"
                disabled={isLoginInProgress}
                placeholder={localization.repositoryHelperText}
                fullWidth={true}
                type="url"
                value={url}
                onChange={(ev) => {
                  setUrl(ev.target.value)
                }}
                style={{ paddingBottom: 30 }}
              />
              <Button
                aria-label={localization.loginButtonTitle}
                fullWidth={true}
                disabled={isLoginInProgress}
                variant="contained"
                color="primary"
                type="submit">
                {localization.loginButtonTitle}
                {isLoginInProgress && <CircularProgress size={14} />}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
