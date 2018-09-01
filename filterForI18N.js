import { isPlainObject, mapValues, values, isString, isNil } from 'lodash';
import { LOCALIZATION_LANGS, EN, ES, ZH_CN } from '@shared/constants/localization';


/**
 * Filter data structure to i18N structure
 
  from:
  {
    name: { en: 'Foo', cn: '福' },
  }

  to:
  {
    en: { name: 'Foo' },
    cn: { name: '福' }
  }

 */
export function filterForI18N( data ) {
  let res = {
    [ZH_CN]: {},
    [EN]: {},
    [ES]: {},
  }

  recurToGeti18NStructure( data, res[ ZH_CN ], ZH_CN )
  recurToGeti18NStructure( data, res[EN], EN )
  recurToGeti18NStructure( data, res[ES], ES )

  return res

  function recurToGeti18NStructure( data, passing={}, lang ) {
    if ( isPlainObject( data ) ) {
      mapValues( data, filter )
    }

    function filter( value, key ) {

      const theIsBasicStructure = isBasicStructure( value )
  
      if ( theIsBasicStructure ) {
        passing[ key ] = value[ lang ]
      }
  
      if ( ! theIsBasicStructure ) {
        const newPassing = {}
        passing[ key ] = newPassing
        recurToGeti18NStructure( value, newPassing, lang  )   
      }
    }
  }

  

  /**
   * Whether data is basic structure: { en: '', cn: '' }
   */
  function isBasicStructure( data ) {
    if ( isPlainObject( data ) ) {
      const keys = Object.keys( data )
      const isEqualKeys = keys.every( key => LOCALIZATION_LANGS.includes( key ) ) 
      // && LOCALIZATION_LANGS.every( lang => keys.includes( lang ) )
      const isValidValues = values( data ).every( value => ( isString(value) || isNil( value ) ) )
      return isEqualKeys && isValidValues
    }
    return false
  }
}




