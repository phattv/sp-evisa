// @flow
// vendor
import * as React from 'react'
// custom
import { colors } from '../constants/ui'

type Props = {}
type State = {}

class BusinessVisaFees extends React.Component<Props, State> {
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
              rowSpan="12"
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
              colSpan="7"
              style={{
                textAlign: 'center',
              }}
            >
              NORMAL PROCESSING (2 WORKING DAYS)
            </td>
          </tr>
          <tr>
            <td>1 pax</td>
            <td style={{ textAlign: 'center' }}>21</td>
            <td style={{ textAlign: 'center' }}>26</td>
            <td style={{ textAlign: 'center' }}>34</td>
            <td style={{ textAlign: 'center' }}>55</td>
            <td style={{ textAlign: 'center' }} rowSpan="5">
              N/A
            </td>
            <td style={{ textAlign: 'center' }} rowSpan="5">
              N/A
            </td>
          </tr>
          <tr>
            <td>2 pax</td>
            <td style={{ textAlign: 'center' }}>18.25</td>
            <td style={{ textAlign: 'center' }}>23/25</td>
            <td style={{ textAlign: 'center' }}>30.25</td>
            <td style={{ textAlign: 'center' }}>52.25</td>
          </tr>
          <tr>
            <td>3-5 pax</td>
            <td style={{ textAlign: 'center' }}>17.25</td>
            <td style={{ textAlign: 'center' }}>22.25</td>
            <td style={{ textAlign: 'center' }}>28.25</td>
            <td style={{ textAlign: 'center' }}>46.75</td>
          </tr>
          <tr>
            <td>6-9 pax</td>
            <td style={{ textAlign: 'center' }}>15.25</td>
            <td style={{ textAlign: 'center' }}>19.25</td>
            <td style={{ textAlign: 'center' }}>26.25</td>
            <td style={{ textAlign: 'center' }}>39.05</td>
          </tr>
          <tr>
            <td>10+ pax</td>
            <td style={{ textAlign: 'center' }}>14</td>
            <td style={{ textAlign: 'center' }}>17</td>
            <td style={{ textAlign: 'center' }}>22</td>
            <td style={{ textAlign: 'center' }}>33</td>
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
              URGENT PROCESSING (1 WORKING DAY)
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
              Plus 10 USD/pax
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
              SUPER-URGENT PROCESSING (4 WORKING HOURS)
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
              Plus 25 USD/pax
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
              INSTANT PROCESSING (2 WORKING HOURS)
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

export default BusinessVisaFees
