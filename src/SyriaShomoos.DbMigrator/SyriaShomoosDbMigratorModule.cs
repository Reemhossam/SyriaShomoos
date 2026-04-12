using SyriaShomoos.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace SyriaShomoos.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(SyriaShomoosEntityFrameworkCoreModule),
    typeof(SyriaShomoosApplicationContractsModule)
)]
public class SyriaShomoosDbMigratorModule : AbpModule
{
}
