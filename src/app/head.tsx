export default function Head() {
  return (
    <>
      {/* Event snippet for Oldalmegtekintés conversion page - homepage only */}
      <script
        dangerouslySetInnerHTML={{
          __html: "gtag('event', 'conversion', {'send_to': 'AW-18115939358/ySUcCJH18aEcEJ6Yrb5D'});",
        }}
      />
    </>
  );
}
