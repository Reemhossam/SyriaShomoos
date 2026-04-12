using Xunit;

namespace SyriaShomoos.EntityFrameworkCore;

[CollectionDefinition(SyriaShomoosTestConsts.CollectionDefinitionName)]
public class SyriaShomoosEntityFrameworkCoreCollection : ICollectionFixture<SyriaShomoosEntityFrameworkCoreFixture>
{

}
