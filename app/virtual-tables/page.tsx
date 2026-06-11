"use client";

import { VirtualTableManager } from "@quillsql/admin";

export default function VirtualTablesPage() {
  return (
    	<VirtualTableManager
    	  containerStyle={{
    	    width: "100vw",
    	    height: "100vh",
    	  }}
    	/>
  );
}
