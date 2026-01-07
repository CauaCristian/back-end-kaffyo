import { TenantEntity } from "../entities/Tenant_Entity";
import { dataSource } from "../sources/Data_Source";

export const tenantRepository = dataSource.getRepository(TenantEntity).extend({
    async createTenant(data:Partial<TenantEntity>){
        const tenant = this.create({
            ...data
        });
        return await this.save(tenant);
    }
})