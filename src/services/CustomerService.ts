import { FilteringQueryV2 } from "$entities/Query";
import { INTERNAL_SERVER_ERROR_SERVICE_RESPONSE } from "$entities/Service";
import Logger from "$pkg/logger";
import { prisma } from "$utils/prisma.utils";
import { uploadAndProcessExcel } from "./ExcelService";
import { buildFilterQueryLimitOffsetV2 } from "./helpers/FilterQueryV2";

export async function importCustomer(excelFile: Express.Multer.File) {
  try {
    const processExcel = await uploadAndProcessExcel(excelFile);

    return processExcel;
  } catch (error) {
    Logger.error(`CustomerService.post : ${error}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}

export async function getCustomers(filters: FilteringQueryV2) {
  try {
    const prismaFilter = buildFilterQueryLimitOffsetV2(filters);
    const [customer, total] = await Promise.all([
      prisma.customer.findMany(prismaFilter),
      prisma.customer.count({
        where: prismaFilter.where,
      }),
    ]);

    const page = filters.page ?? 1;
    const rows = filters.rows ?? 10;
    const totalPages = Math.ceil(total / rows);

    return {
      status: true,
      data: {
        data: customer,
        meta: {
          page,
          rows,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    };
  } catch (error) {
    Logger.error(`CustomerService.get : ${error}`);
    return INTERNAL_SERVER_ERROR_SERVICE_RESPONSE;
  }
}
