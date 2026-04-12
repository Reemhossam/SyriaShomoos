using Microsoft.Extensions.Localization;
using SyriaShomoos.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace SyriaShomoos;

[Dependency(ReplaceServices = true)]
public class SyriaShomoosBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<SyriaShomoosResource> _localizer;

    public SyriaShomoosBrandingProvider(IStringLocalizer<SyriaShomoosResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
