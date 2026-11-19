import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listServicePackages = createServerFn({ method: "GET" })
  .validator(
    z.object({
      serviceKey: z.enum([
        "website",
        "hosting",
        "google_ads",
        "facebook_ads",
        "content",
        "digital_marketing",
      ]),
    })
  )
  .handler(async ({ data, context }) => {
    const page = await context
      .getBase44()
      .entities.ServicePackage.filter(
        { service_key: data.serviceKey, is_active: true },
        { sort: "sort_order", limit: 50 }
      );

    return page.items;
  });

export const listAllServicePackages = createServerFn({ method: "GET" }).handler(
  async ({ context }) => {
    const page = await context
      .getBase44()
      .entities.ServicePackage.filter({ is_active: true }, { sort: "sort_order", limit: 200 });

    return page.items;
  }
);