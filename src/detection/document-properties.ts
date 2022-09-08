import { SignalKind } from '../signals'
import { BotKind, ComponentDict, DetectionResponse, State } from '../types'
import { includes } from '../utils'

export function detectDocumentProperties({
  [SignalKind.DocumentProps]: documentProps,
}: ComponentDict): DetectionResponse {
  if (documentProps.state !== State.Success) return false
  if (
    includes(
      documentProps.value,
      /^([a-z]){3}_.*_(Array|Promise|Symbol)$/,
      'selenium',
      '__fxdriver_unwrapped',
      '__selenium_unwrapped',
      '__webdriver_evaluate',
      '__driver_evaluate',
      '__webdriver_unwrapped',
      '__driver_unwrapped',
      '__selenium_evaluate',
      '__webdriver_script_function',
      '__webdriver_script_func',
      '__webdriver_script_fn',
      '__fxdriver_evaluate',
      '__webdriverFunc',
      '$chrome_asyncScriptInfo',
      '__$webdriverAsyncExecutor',
      '__lastWatirAlert',
      '__lastWatirConfirm',
      '__lastWatirPrompt',
      '_WEBDRIVER_ELEM_CACHE',
      'ChromeDriverw',
      'selenium-evaluate',
      '_Selenium_IDE_Recorder',
    )
  ) {
    return BotKind.Selenium
  }
}