using Volo.Abp.Modularity;

namespace SyriaShomoos;

[DependsOn(
    typeof(SyriaShomoosDomainModule),
    typeof(SyriaShomoosTestBaseModule)
)]
public class SyriaShomoosDomainTestModule : AbpModule
{

}
