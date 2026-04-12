using Volo.Abp.Modularity;

namespace SyriaShomoos;

[DependsOn(
    typeof(SyriaShomoosApplicationModule),
    typeof(SyriaShomoosDomainTestModule)
)]
public class SyriaShomoosApplicationTestModule : AbpModule
{

}
