// Dependencies for Node.js.
// In browsers, use <script> tags as in the example demo.html.
if (typeof module !== "undefined") {
    // gotta use var here because const/let are block-scoped to the if statement.
    var xrpl = require('xrpl')
  }

  // Connect -------------------------------------------------------------------
  async function main() {
    console.log("Connecting to Mainnet...")
    const client = new xrpl.Client('wss://s1.ripple.com')
    await client.connect()

    client.on('error', (errorCode, errorMessage) => {
      console.log(errorCode + ': ' + errorMessage)
    })

    const my_address = 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn';

    // Request account info for my_address to check account settings ------------
    const response = await client.request(
      {command: 'account_info', account: my_address })
    const settings = response.result

    console.log('Got settings for address', my_address);
    console.log('No Freeze enabled?', (settings.noFreeze === true))

    await client.disconnect()

    // End main()
  }

  main().catch(console.error)
