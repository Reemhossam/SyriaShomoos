using Volo.Abp.Modularity;

namespace SyriaShomoos;

/* Inherit from this class for your domain layer tests. */
public abstract class SyriaShomoosDomainTestBase<TStartupModule> : SyriaShomoosTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
