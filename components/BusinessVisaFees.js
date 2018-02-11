// @flow
// vendor
import * as React from 'react'
// custom
import { colors } from '../constants/ui'

type Props = {}
type State = {}

class TouristVisaFees extends React.Component<Props, State> {
  render() {
    return (
      <table
        style={{
          width: '100%',
        }}
      >
        <tbody>
          <tr
            style={{
              backgroundColor: colors.visaRed,
              color: colors.white,
              fontWeight: 'bold',
            }}
          >
            <th colSpan="2">TYPE OF VISA</th>
            <th>1 MONTH SINGLE</th>
            <th>1 MONTH MULTIPLE</th>
            <th>3 MONTHS SINGLE</th>
            <th>3 MONTHS MULTIPLE</th>
            <th>6 MONTHS MULTIPLE</th>
            <th>1 YEAR MULTIPLE</th>
          </tr>
          <tr
            style={{
              backgroundColor: colors.lighterGrey,
            }}
          >
            <td
              rowSpan="10"
              style={{
                backgroundColor: colors.visaBlue,
                color: colors.white,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              SERVICE FEE
            </td>
            <td>No. of Pax</td>
            <td
              colSpan="6"
              style={{
                textAlign: 'center',
              }}
            >
              NORMAL PROCESSING (2 WORKING DAYS)
            </td>
          </tr>
          <tr>
            <td>1 pax</td>
            <td style={{ textAlign: 'center' }}>110</td>
            <td style={{ textAlign: 'center' }} rowSpan="5">
              N/A
            </td>
            <td style={{ textAlign: 'center' }}>146</td>
            <td style={{ textAlign: 'center' }}>174</td>
            <td style={{ textAlign: 'center' }}>361</td>
            <td style={{ textAlign: 'center' }}>523</td>
          </tr>
          <tr>
            <td>2 pax</td>
            <td style={{ textAlign: 'center' }}>105</td>
            <td style={{ textAlign: 'center' }}>139</td>
            <td style={{ textAlign: 'center' }}>166</td>
            <td style={{ textAlign: 'center' }}>344</td>
            <td style={{ textAlign: 'center' }}>498</td>
          </tr>
          <tr>
            <td>3-5 pax</td>
            <td style={{ textAlign: 'center' }}>103</td>
            <td style={{ textAlign: 'center' }}>135</td>
            <td style={{ textAlign: 'center' }}>162</td>
            <td style={{ textAlign: 'center' }}>333</td>
            <td style={{ textAlign: 'center' }}>483</td>
          </tr>
          <tr>
            <td>6-9 pax</td>
            <td style={{ textAlign: 'center' }}>101</td>
            <td style={{ textAlign: 'center' }}>133</td>
            <td style={{ textAlign: 'center' }}>159</td>
            <td style={{ textAlign: 'center' }}>326</td>
            <td style={{ textAlign: 'center' }}>472</td>
          </tr>
          <tr>
            <td>10+ pax</td>
            <td style={{ textAlign: 'center' }}>99</td>
            <td style={{ textAlign: 'center' }}>130</td>
            <td style={{ textAlign: 'center' }}>155</td>
            <td style={{ textAlign: 'center' }}>320</td>
            <td style={{ textAlign: 'center' }}>462</td>
          </tr>
          <tr
            style={{
              backgroundColor: colors.lighterGrey,
            }}
          >
            <td />
            <td
              colSpan="7"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              URGENT PROCESSING (3 WORKING DAYS)
            </td>
          </tr>
          <tr>
            <td />
            <td
              colSpan="7"
              style={{
                textAlign: 'center',
              }}
            >
              Plus 30 USD/pax
            </td>
          </tr>
          <tr
            style={{
              backgroundColor: colors.lighterGrey,
            }}
          >
            <td />
            <td
              colSpan="7"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              SUPER-URGENT PROCESSING (2 WORKING DAYS)
            </td>
          </tr>
          <tr>
            <td />
            <td
              colSpan="7"
              style={{
                textAlign: 'center',
              }}
            >
              Plus 50 USD/pax
            </td>
          </tr>
          <tr
            style={{
              backgroundColor: colors.visaRed,
              color: colors.white,
              fontWeight: 'bold',
            }}
          >
            <td colSpan="2" style={{ backgroundColor: colors.visaBlue }}>
              STAMPING FEE
            </td>
            <td style={{ textAlign: 'center' }}>25</td>
            <td style={{ textAlign: 'center' }}>50</td>
            <td style={{ textAlign: 'center' }}>25</td>
            <td style={{ textAlign: 'center' }}>50</td>
            <td style={{ textAlign: 'center' }}>95</td>
            <td style={{ textAlign: 'center' }}>135</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default TouristVisaFees
