import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { withDefaults } from "@/lib/siteSettings";

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  const [record, setRecord] = useState(null);

  const load = useCallback(async () => {
    const page = await base44.entities.SiteSetting.list("-created_date", 1);
    const items = page?.items ?? page ?? [];
    setRecord(items[0] ?? null);
    return items[0] ?? null;
  }, []);

  useEffect(() => {
    load().catch(() => {
      // Keep the built-in defaults when the setting cannot be read.
    });
  }, [load]);

  const value = useMemo(
    () => ({ settings: withDefaults(record), record, refresh: load }),
    [record, load]
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) return { settings: withDefaults(null), record: null, refresh: async () => null };
  return context;
}