// Entry for the standalone legal pages. Each HTML shell sets window.__LEGAL_DOC
// before this module runs; we mount the matching document.
import { mountLegal } from './legal'

const doc = (window as any).__LEGAL_DOC === 'terms' ? 'terms' : 'privacy'
mountLegal(doc)
