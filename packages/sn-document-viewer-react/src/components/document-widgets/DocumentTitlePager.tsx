import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import { useDocumentData, useLocalization, useViewerState } from '../../hooks'

/**
 * Document widget component for paging
 */
export const DocumentTitlePager: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false)

  const { documentData } = useDocumentData()
  const viewerState = useViewerState()
  const localization = useLocalization()

  useEffect(() => {
    setCurrentPage(viewerState.activePages[0])
  }, [viewerState])

  const setPage = useCallback(
    (index: number) => {
      const container = document.getElementById('sn-document-viewer-pages')
      const item = document.querySelector(`.Page`)
      if (container && container.scrollTo && item) {
        container!.scrollTo({
          top: (item!.clientHeight + 8 * 4) * (index - 1),
          behavior: 'smooth',
        })
      }
      viewerState.updateState({ visiblePages: [index] })
    },
    [viewerState],
  )

  const [currentPage, setCurrentPage] = useState(viewerState.activePages[0])

  const gotoPage = (page: string | number) => {
    let pageInt = typeof page === 'string' ? parseInt(page, 10) : page
    if (!isNaN(pageInt)) {
      pageInt = Math.max(pageInt, 1)
      pageInt = Math.min(pageInt, documentData.pageCount)
      setCurrentPage(pageInt)
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setIsFocused(false)}>
      <Typography
        onClick={() => setIsFocused(true)}
        variant="h6"
        color="inherit"
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', overflow: 'hidden', margin: '0 2.5em' }}
        title={documentData.documentName}>
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {documentData.documentName}&nbsp;
        </div>
        {isFocused ? (
          <form
            onSubmit={(ev) => {
              ev.preventDefault()
            }}>
            <TextField
              style={{ flexShrink: 0 }}
              title={localization.gotoPage}
              value={currentPage}
              onChange={(ev) => gotoPage(ev.currentTarget.value)}
              onBlur={() => setPage(currentPage)}
              type="number"
              required={true}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 1,
                max: documentData.pageCount,
                style: { textAlign: 'center' },
              }}
              margin="dense"
            />
          </form>
        ) : (
          <div style={{ flexShrink: 0 }}>
            {currentPage} / {documentData.pageCount}
          </div>
        )}
      </Typography>
    </ClickAwayListener>
  )
}
