export const getCloudAPIConfig = (): { baseUrl: string } => {
  switch (process.env.NEXT_PUBLIC_ENV_MODE) {
    case "LOCAL":
      return {
        baseUrl: "http://localhost:6002/coles-recycle-app-dev/australia-southeast1"
      }
    case "DEV":
      return {
        baseUrl: "https://australia-southeast1-coles-recycle-app-dev.cloudfunctions.net"
      }
    case "STAGING":
      return {
        baseUrl: "https://australia-southeast1-coles-recycle-app.cloudfunctions.net"
      }
    default:
      return {
        baseUrl: "https://australia-southeast1-coles-recycle-app-dev.cloudfunctions.net"
      }
  }
}